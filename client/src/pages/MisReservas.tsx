import { useAuth } from "@/_core/hooks/useAuth";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Calendar, Clock, MapPin, X } from "lucide-react";
import { toast } from "sonner";

export default function MisReservas() {
  const { user, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  const { data: myBookings = [], isLoading } = trpc.bookings.myBookings.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const cancelBooking = trpc.bookings.cancel.useMutation({
    onSuccess: () => {
      toast.success("Reserva cancelada");
      utils.bookings.myBookings.invalidate();
    },
    onError: (error) => {
      toast.error(error.message || "Error al cancelar la reserva");
    },
  });

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="min-h-screen bg-muted/30 py-8">
        <div className="container max-w-4xl">
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Inicia sesión para ver tus reservas</h2>
              <p className="text-muted-foreground mb-6">
                Necesitas estar autenticado para acceder a tus reservas
              </p>
              <Button onClick={() => (window.location.href = getLoginUrl())} size="lg">
                Iniciar Sesión
              </Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </Layout>
    );
  }

  // Separar reservas activas y pasadas
  const today = new Date().toISOString().split("T")[0];
  const activeBookings = myBookings.filter(
    (item) => item.booking && item.booking.date >= today && item.booking.status === "confirmed"
  );
  const pastBookings = myBookings.filter(
    (item) => item.booking && (item.booking.date < today || item.booking.status === "cancelled")
  );

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-8">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mis Reservas</h1>
          <p className="text-muted-foreground">
            Gestiona tus reservas de pistas de pádel
          </p>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Cargando reservas...</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Reservas Activas */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Próximas Reservas</h2>
              {activeBookings.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground mb-4">
                      No tienes reservas próximas
                    </p>
                    <Button onClick={() => (window.location.href = "/reservas")}>
                      Hacer una Reserva
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {activeBookings.map((item) => {
                    if (!item.booking || !item.court) return null;
                    const booking = item.booking;
                    const court = item.court;

                    return (
                      <Card key={booking.id} className="border-primary/20">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <MapPin className="w-5 h-5 text-primary" />
                              {court.name}
                            </span>
                            <span className="text-sm font-normal text-muted-foreground">
                              {booking.status === "confirmed" ? "Confirmada" : "Pendiente"}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span>
                                  {new Date(booking.date).toLocaleDateString("es-ES", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span>
                                  {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                              {booking.notes && (
                                <p className="text-sm text-muted-foreground mt-2">
                                  Nota: {booking.notes}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => cancelBooking.mutate({ bookingId: booking.id })}
                              disabled={cancelBooking.isPending}
                            >
                              <X className="w-4 h-4 mr-1" />
                              Cancelar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Historial */}
            {pastBookings.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Historial</h2>
                <div className="space-y-4">
                  {pastBookings.map((item) => {
                    if (!item.booking || !item.court) return null;
                    const booking = item.booking;
                    const court = item.court;

                    return (
                      <Card key={booking.id} className="opacity-60">
                        <CardHeader className="pb-3">
                          <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-base">
                              <MapPin className="w-4 h-4" />
                              {court.name}
                            </span>
                            <span className="text-xs font-normal text-muted-foreground">
                              {booking.status === "cancelled" ? "Cancelada" : "Completada"}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(booking.date).toLocaleDateString("es-ES", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {booking.startTime} - {booking.endTime}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      </div>
    </Layout>
  );
}

