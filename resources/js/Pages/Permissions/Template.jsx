import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Container from "@/Components/Container";
import WorkTemplateConditionForm from "@/Components/Permissions/WorkTemplateConditionForm";

export default function Template({
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
          New Permission
        </h2>
      }
    >
      <Head title="Meters" />
      <Container route={route("permission.index")} buttonText="Before">
        <WorkTemplateConditionForm
          plants={plants}
          areaMachine={areaMachine}
          suppliers={suppliers}
          user={auth.user}
          approval={approval}
        />
      </Container>
    </AuthenticatedLayout>
  );
}
