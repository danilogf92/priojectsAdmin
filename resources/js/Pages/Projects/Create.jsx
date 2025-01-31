import FormMeters from "@/Components/FormMeters";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
// import { HomeIcon } from "heroicons/react/solid";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import Container from "@/Components/Container";
import { data } from "autoprefixer";

export default function Create({ auth, plants, meters }) {
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
      <Container route={route("measurement.index")} buttonText="Before">
        <FormMeters plants={plants} meters={meters} />
      </Container>
    </AuthenticatedLayout>
  );
}
