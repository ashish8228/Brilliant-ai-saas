import Sidebar from "@/components/ui/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
     <div className="h-full relative">
      <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-72 z-80 bg-gray-900">
        <Sidebar />
      </div>

      <main className="md:pl-62">
{children}
      </main>
      </div>
  );
};


export default DashboardLayout;