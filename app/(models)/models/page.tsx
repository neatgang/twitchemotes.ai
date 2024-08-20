import ModelSidebar from "@/components/models/model-sidebar";
import TrainingImages from "@/components/models/training-images";


export default function Home() {
  return (
    <div className="p-6 h-full">
      {/* <Header /> */}
      <div className="flex gap-6 mt-2 mb-2">
        <ModelSidebar />
        <TrainingImages />
      </div>
    </div>
  )
}