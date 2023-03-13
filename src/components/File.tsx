interface IFile {
  name: string;
}
export default function File({ name }: IFile) {

    return (
        <div>
            {name}
        </div>
    )
}
