import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Container from "@/Components/Container";
import FormProductionByWeight from "@/Components/MyComponents/FormProductionByWeight";

export default function Create({ auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          New Data Production
        </h2>
      }
    >
      <Head title="Meters" />
      <Container
        route={route("production-by-weight.index")}
        buttonText="Before"
      >
        <FormProductionByWeight />
      </Container>
    </AuthenticatedLayout>
  );
}
