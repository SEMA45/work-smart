import { FC } from "react";

type Props = {
  showPreview: any;
  setPreview: any;
};

const PreviewPrint: FC<Props> = ({ showPreview, setPreview }) => {
  return (
    <div
      className={`bg-blue-900/70 fixed z-[9999] top-0 left-0 bottom-0 right-0 ${
        showPreview ? "flex" : ""
      } justify-center p-6 relative`}
    >
     {/**Close Button */}
	 <button className="h-8 w-8 rounded bg-red-600 text-white">&times</button>
     {/**Close Button */}
    </div>
  );
};

export default PreviewPrint;
