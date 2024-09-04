import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { Input } from "@/components/ui/input.tsx";

export const AdminFilters = () => {
  return (
    <Accordion type="single" defaultValue="filters" collapsible className="p-5">
      <AccordionItem value="filters">
        <AccordionTrigger>Фільтри</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-5">
          <Input></Input>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
