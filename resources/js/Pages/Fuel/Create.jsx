import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import FormFuelMeters from "@/Components/MyComponents/FormFuelMeters";

export default function Create({ auth, plants, fuelEquipment }) {
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
        <FormFuelMeters plants={plants} fuelEquipment={fuelEquipment} />
      </Container>
    </AuthenticatedLayout>
  );
}
