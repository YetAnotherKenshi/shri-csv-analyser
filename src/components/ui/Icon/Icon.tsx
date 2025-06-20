import bin from "/src/assets/bin.svg";
import file from "/src/assets/file.svg";
import sad from "/src/assets/sad.svg";
import smile from "/src/assets/smile.svg";
import loader from "/src/assets/loader.svg";
import deleteIcon from "/src/assets/delete.svg";
import logo from "/src/assets/logo.svg";
import history from "/src/assets/history.svg";
import generate from "/src/assets/generate.svg";
import upload from "/src/assets/upload.svg";

const icons = {
    bin,
    file,
    sad,
    smile,
    loader,
    delete: deleteIcon,
    logo,
    history,
    generate,
    upload,
};

export type IconName = keyof typeof icons;

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    name: IconName;
    className?: string;
    alt?: string;
}

const Icon: React.FC<IconProps> = ({ name, className, alt, ...props }) => {
    const src = icons[name];
    if (!src) return null;
    return <img src={src} className={className} alt={alt || name} {...props} />;
};

export default Icon;
