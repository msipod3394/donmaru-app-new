import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  // homeにリダイレクト
  useEffect(() => {
    router.push("/home", "/");
  }, []);

  return null;
};

export default Index;
