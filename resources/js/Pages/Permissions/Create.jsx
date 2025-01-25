import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import WorkConditionForm from "@/Components/Permissions/WorkConditionForm";

export default function Create({
  auth,
  plants,
  areaMachine,
  suppliers,
  conditions,
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          New Permission
        </h2>
      }
    >
      <Head title="Meters" />
      <Container route={route("permission.index")} buttonText="Before">
        <WorkConditionForm
          plants={plants}
          areaMachine={areaMachine}
          suppliers={suppliers}
          conditions={conditions}
          user={auth.user}
        />
      </Container>
    </AuthenticatedLayout>
  );
}
