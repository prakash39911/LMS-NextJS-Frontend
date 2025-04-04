export default function StatCard({ icon: Icon, title, value, color }: any) {
  return (
    <div className="bg-gray-800 p-6 md:h-40 md:p-10 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-800">
      <div className={`flex items-center justify-between`}>
        <div>
          <p className="text-gray-400 text-sm md:text-xl">{title}</p>
          <h3 className="text-2xl font-bold text-gray-300 mt-2 md:text-3xl">
            {value}
          </h3>
        </div>
        <div className={`${color} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>
    </div>
  );
}
