import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserState } from "@/types/User.ts";
import _ from "lodash";
import { getStatusName } from "@/lib/utils.ts";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useSearch } from "@tanstack/react-router";

type AdminFiltersType = {
  search?: string;
  status?: UserState;
};

export const AdminFilters = ({
  submitFilters,
}: {
  submitFilters: (filters: AdminFiltersType) => void;
}) => {
  const { search, status } = useSearch({ strict: false }) as any;

  // Ensure initial values are defined
  const [searchValue, setSearch] = useState<string>(search ?? "");
  const [statusValue, setStatus] = useState<UserState>(
    status ?? UserState.STATUS_ALL,
  );

  return (
    <Accordion type="single" defaultValue="filters" collapsible>
      <AccordionItem value="filters">
        <AccordionTrigger>Фільтри</AccordionTrigger>
        <AccordionContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitFilters({ search: searchValue, status: statusValue });
            }}
            className="flex flex-col gap-5 p-2"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor={"admin_filters_search"}>Email</Label>
              <Input
                id="admin_filters_search"
                onChange={(e) => setSearch(e.target.value)}
                value={searchValue}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={"admin_filters_status"}>Статус</Label>
              <Select
                onValueChange={(value) => setStatus(value as UserState)}
                value={statusValue}
              >
                <SelectTrigger className="w-full" id="admin_filters_status">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  {_.map(UserState, (value, key) => {
                    return (
                      <SelectItem value={value} key={key}>
                        {getStatusName(value)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between gap-2">
              <Button
                variant="outline"
                className="flex-1"
                type="submit"
                onClick={() => {
                  setSearch("");
                  setStatus(UserState.STATUS_ALL);
                }}
              >
                Скинути
              </Button>
              <Button className="flex-1" type="submit">
                Застосувати
              </Button>
            </div>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
