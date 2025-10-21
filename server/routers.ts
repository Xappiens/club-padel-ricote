import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import * as db from "./db";

// Generar ID único
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  courts: router({
    list: publicProcedure.query(async () => {
      return await db.getAllCourts();
    }),
    
    create: protectedProcedure
      .input(
        z.object({
          name: z.string(),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Solo admin puede crear pistas
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Solo administradores pueden crear pistas" });
        }
        
        const courtId = generateId();
        await db.createCourt({
          id: courtId,
          name: input.name,
          description: input.description || null,
          isActive: "active",
        });
        
        return { success: true, courtId };
      }),
  }),

  bookings: router({
    // Crear nueva reserva
    create: protectedProcedure
      .input(
        z.object({
          courtId: z.string(),
          date: z.string(), // YYYY-MM-DD
          startTime: z.string(), // HH:MM
          endTime: z.string(), // HH:MM
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Verificar que no haya conflictos
        const existingBookings = await db.getBookingsByDateAndCourt(input.date, input.courtId);
        
        for (const booking of existingBookings) {
          // Verificar solapamiento de horarios
          if (
            (input.startTime >= booking.startTime && input.startTime < booking.endTime) ||
            (input.endTime > booking.startTime && input.endTime <= booking.endTime) ||
            (input.startTime <= booking.startTime && input.endTime >= booking.endTime)
          ) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Ya existe una reserva en ese horario",
            });
          }
        }
        
        const bookingId = generateId();
        await db.createBooking({
          id: bookingId,
          userId: ctx.user.id,
          courtId: input.courtId,
          date: input.date,
          startTime: input.startTime,
          endTime: input.endTime,
          status: "confirmed",
          notes: input.notes || null,
        });
        
        return { success: true, bookingId };
      }),
    
    // Obtener reservas del usuario
    myBookings: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserBookings(ctx.user.id);
    }),
    
    // Obtener reservas por fecha
    byDate: publicProcedure
      .input(z.object({ date: z.string() }))
      .query(async ({ input }) => {
        return await db.getBookingsByDate(input.date);
      }),
    
    // Cancelar reserva
    cancel: protectedProcedure
      .input(z.object({ bookingId: z.string() }))
      .mutation(async ({ input, ctx }) => {
        await db.cancelBooking(input.bookingId, ctx.user.id);
        return { success: true };
      }),
    
    // Listar todas las reservas (admin)
    all: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Solo administradores pueden ver todas las reservas" });
      }
      return await db.getAllBookings();
    }),
  }),
});

export type AppRouter = typeof appRouter;
