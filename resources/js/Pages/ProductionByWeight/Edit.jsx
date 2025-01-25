import Container from "@/Components/Container";
import FormEditProductionByWeight from "@/Components/MyComponents/FormEditProductionByWeight";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Edit({ auth, production }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Edit Production
        </h2>
      }
    >
      <Head title="Meters" />

      <Container
        route={route("production-by-weight.index")}
        buttonText="Before"
      >
        <FormEditProductionByWeight production={production} />
      </Container>
    </AuthenticatedLayout>
  );
}
