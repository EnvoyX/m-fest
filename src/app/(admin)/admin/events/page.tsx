import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Metadata } from "next";
import MCareDataTable from "@/components/admin/events/MCareDataTable";
import MTalks_MExpoDataTable from "@/components/admin/events/MTalks_MExpoDataTable";
import ETUDataTable from "@/components/admin/events/EtuDataTable";
import MRunDataTable from "@/components/admin/events/MRunDataTable";

export const metadata: Metadata = {
  title: "Events Management | Admin Panel",
  description: "Mechanical Festival 2026",
};

export default function DatabasePage() {
  return (
    <section className="min-h-screen bg-transparent w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Events Management
        </h1>
      </div>
      <Tabs defaultValue="m-care" className="mt-8 overflow-x-auto">
        <TabsList className="bg-white/5 border overflow-x-auto flex flex-col h-64 mx-auto sm:h-10 sm:flex-row">
          <TabsTrigger value="m-care" className="cursor-pointer">
            M-CARE
          </TabsTrigger>
          <TabsTrigger value="m-run" className="cursor-pointer">
            M-RUN
          </TabsTrigger>
          <TabsTrigger value="etu" className="cursor-pointer">
            ETU
          </TabsTrigger>
          <TabsTrigger value="m-talks_m-expo" className="cursor-pointer">
            M-TALKS & M-EXPO
          </TabsTrigger>
        </TabsList>
        <TabsContent value="m-care">
          <div className="mt-8">
            <MCareDataTable />
          </div>
        </TabsContent>
        <TabsContent value="m-run">
          <div className="mt-8">
            <MRunDataTable />
          </div>
        </TabsContent>
        <TabsContent value="etu">
          <div className="mt-8">
            <ETUDataTable />
          </div>
        </TabsContent>
        <TabsContent value="m-talks_m-expo">
          <div className="mt-8">
            <MTalks_MExpoDataTable />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
