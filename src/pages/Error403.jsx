import ErrorPage from "../components/ErrorPage";

export default function Error403() {
  return (
    <ErrorPage
      code="403"
      description="Forbidden"
      image="https://cdn-icons-png.flaticon.com/512/755/755014.png"
    />
  );
}