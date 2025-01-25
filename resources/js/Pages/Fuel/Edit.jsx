import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import FormEditFuelMeters from "@/Components/MyComponents/FormEditFuelMeters";

export default function Edit({ auth, plants, fuelEquipment, fuel, equipment }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          New Measure
        </h2>
      }
    >
      <Head title="Meters" />
      <Container route={route("fuel.index")} buttonText="Before">
        <FormEditFuelMeters
          plants={plants}
          fuelEquipment={fuelEquipment}
          fuel={fuel}
          equipment={equipment}
        />
      </Container>
    </AuthenticatedLayout>
  );
}
