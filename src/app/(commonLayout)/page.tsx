import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";

export default async function Home() {
  const { data, error } = await userService.getSession();
  console.log(data);
  console.log(error);
  return (
    <div>
      <Button variant="outline">Please Click Here</Button>
    </div>
  );
}
