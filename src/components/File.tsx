interface IFile {
  name: string;
}
export default function File({ name }: IFile) {
  return (
    <div className="text-lg hover:bg-gray-400 group flex flex-row justify-between items-center space-x-4">
      <div>
        <p>{name}</p>
      </div>
      <div className="flex flex-row text-xs">
        <p className="invisible group-hover:visible">delete</p>
      </div>
    </div>
  );
}
