import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Reservas() {
  const { user, isAuthenticated } = useAuth();
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [selectedCourt, setSelectedCourt] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<{ start: string; end: string } | null>(null);

  // Queries
  const { data: courts = [] } = trpc.courts.list.useQuery();
  const { data: bookingsByDate = [] } = trpc.bookings.byDate.useQuery({ date: selectedDate });

  // Mutation
  const createBooking = trpc.bookings.create.useMutation({
    onSuccess: () => {
      toast.success("¡Reserva confirmada!");
      setSelectedTime(null);
      setSelectedCourt("");
    },
    onError: (error) => {
      toast.error(error.message || "Error al crear la reserva");
    },
  });

  // Horarios disponibles (9:00 - 23:00, slots de 1 hora)
  const timeSlots: { start: string; end: string; label: string }[] = [];
  for (let hour = 9; hour < 23; hour++) {
    const startTime = `${hour.toString().padStart(2, "0")}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, "0")}:00`;
    timeSlots.push({ start: startTime, end: endTime, label: `${startTime} - ${endTime}` });
  }

  // Verificar si un slot está ocupado
  const isSlotBooked = (courtId: string, startTime: string, endTime: string) => {
    return bookingsByDate.some((item) => {
      if (item.booking?.courtId !== courtId) return false;
      const booking = item.booking;
      
      return (
        (startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime) ||
        (startTime <= booking.startTime && endTime >= booking.endTime)
      );
    });
  };

  const handleReserva = () => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    if (!selectedCourt || !selectedTime) {
      toast.error("Por favor selecciona una pista y un horario");
      return;
    }

    createBooking.mutate({
      courtId: selectedCourt,
      date: selectedDate,
      startTime: selectedTime.start,
      endTime: selectedTime.end,
    });
  };

  // Generar fechas para los próximos 14 días
  const dates = [];
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push({
      value: date.toISOString().split("T")[0],
      label: date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" }),
      isToday: i === 0,
    });
  }

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-8">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Reservar Pista</h1>
          <p className="text-muted-foreground">
            Selecciona fecha, pista y horario para tu reserva
          </p>
        </div>

        {/* Selector de fecha */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Selecciona una fecha
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {dates.map((date) => (
                <button
                  key={date.value}
                  onClick={() => setSelectedDate(date.value)}
                  className={`flex flex-col items-center justify-center min-w-[80px] p-3 rounded-lg border-2 transition-colors ${
                    selectedDate === date.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <span className="text-xs font-medium uppercase">{date.label.split(" ")[0]}</span>
                  <span className="text-lg font-bold">{date.label.split(" ")[1]}</span>
                  <span className="text-xs">{date.label.split(" ")[2]}</span>
                  {date.isToday && (
                    <span className="text-xs mt-1 text-accent font-semibold">Hoy</span>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grid de pistas y horarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {courts.map((court) => (
            <Card key={court.id} className="overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  {court.name}
                </CardTitle>
                {court.description && (
                  <p className="text-sm text-muted-foreground">{court.description}</p>
                )}
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((slot) => {
                    const isBooked = isSlotBooked(court.id, slot.start, slot.end);
                    const isSelected =
                      selectedCourt === court.id &&
                      selectedTime?.start === slot.start &&
                      selectedTime?.end === slot.end;

                    return (
                      <button
                        key={`${court.id}-${slot.start}`}
                        onClick={() => {
                          if (!isBooked) {
                            setSelectedCourt(court.id);
                            setSelectedTime({ start: slot.start, end: slot.end });
                          }
                        }}
                        disabled={isBooked}
                        className={`p-3 rounded-lg text-sm font-medium transition-all ${
                          isBooked
                            ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                            : isSelected
                            ? "bg-accent text-accent-foreground shadow-md scale-105"
                            : "bg-background border-2 border-border hover:border-primary hover:bg-primary/5"
                        }`}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1" />
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botón de reserva */}
        {selectedTime && selectedCourt && (
          <Card className="mt-6 bg-primary/5 border-primary">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">Resumen de tu reserva</h3>
                  <p className="text-muted-foreground">
                    {courts.find((c) => c.id === selectedCourt)?.name} •{" "}
                    {new Date(selectedDate).toLocaleDateString("es-ES", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    • {selectedTime.start} - {selectedTime.end}
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={handleReserva}
                  disabled={createBooking.isPending}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  {createBooking.isPending ? "Reservando..." : "Confirmar Reserva"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {!isAuthenticated && (
          <Card className="mt-6 bg-muted border-border">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Debes iniciar sesión para realizar una reserva
              </p>
              <Button onClick={() => (window.location.href = getLoginUrl())}>
                Iniciar Sesión
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </Layout>
  );
}

