import DataTable from "./components/TableView";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <DataTable />
        </div>
      </div>
    </div>
  );
}