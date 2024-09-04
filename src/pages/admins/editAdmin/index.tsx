import { useParams } from "@tanstack/react-router";

export const EditAdminPage = () => {
  const { userId } = useParams({ strict: false });
  return <>{userId}</>;
};
