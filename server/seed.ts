import { createCourt, getAllCourts } from "./db";

async function seedCourts() {
  console.log("Verificando pistas existentes...");
  
  const existingCourts = await getAllCourts();
  
  if (existingCourts.length > 0) {
    console.log(`Ya existen ${existingCourts.length} pistas. No se creará ninguna nueva.`);
    return;
  }
  
  console.log("Creando pistas del club...");
  
  const courts = [
    {
      id: `court-${Date.now()}-1`,
      name: "Pista 1",
      description: "Pista panorámica con cristal templado y césped artificial premium",
      isActive: "active" as const,
    },
    {
      id: `court-${Date.now()}-2`,
      name: "Pista 2",
      description: "Pista central con gradas y sistema de iluminación LED profesional",
      isActive: "active" as const,
    },
    {
      id: `court-${Date.now()}-3`,
      name: "Pista 3",
      description: "Pista exterior con vistas al Valle de Ricote",
      isActive: "active" as const,
    },
    {
      id: `court-${Date.now()}-4`,
      name: "Pista 4",
      description: "Pista cubierta para entrenamientos y clases",
      isActive: "active" as const,
    },
  ];
  
  for (const court of courts) {
    await createCourt(court);
    console.log(`✓ Creada: ${court.name}`);
  }
  
  console.log("\n✅ Todas las pistas han sido creadas exitosamente!");
}

seedCourts()
  .then(() => {
    console.log("\n🎾 Inicialización completada");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Error durante la inicialización:", error);
    process.exit(1);
  });

