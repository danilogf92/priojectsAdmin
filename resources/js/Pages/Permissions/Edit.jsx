import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import WorkEditConditionForm from "@/Components/Permissions/WorkEditConditionForm";

export default function Edit({
  auth,
  plants,
  areaMachine,
  suppliers,
  approval,
}) {
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
      <Container route={route("permission.index")} buttonText="Before">
        <WorkEditConditionForm
          plants={plants}
          areaMachine={areaMachine}
          suppliers={suppliers}
          approval={approval}
        />
      </Container>
    </AuthenticatedLayout>
  );
}
