import ErrorPage from "../components/ErrorPage";

export default function Error401() {
  return (
    <ErrorPage
      code="401"
      description="Unauthorized"
      image="https://cdn-icons-png.flaticon.com/512/564/564619.png"
    />
  );
}