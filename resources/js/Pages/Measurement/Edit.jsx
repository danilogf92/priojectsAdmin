import Container from "@/Components/Container";
import FormMetersEdit from "@/Components/FormMetersEdit";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, plants, meters, measurement }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit Measurement
        </h2>
      }
    >
      <Head title="Meters" />

      <Container route={route("measurement.index")} buttonText="Before">
        <FormMetersEdit
          plants={plants}
          meters={meters}
          measurement={measurement}
        />
      </Container>
    </AuthenticatedLayout>
  );
}
