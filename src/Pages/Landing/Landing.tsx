import { FC } from "react";
import longLogo from "../../Asserts/blueLogo.png";
import { Link } from "react-router-dom";

type Props = {};

const Landing: FC<Props> = () => {
  return (
    <div className="w-screen h-fit">
      <header className="w-full py-10">
        <div className="w-full h-16 px-20 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={longLogo} alt="short_logo" className="w-40" />
            <div className="flex items-center divide-x-2 divide-gray-300 h-full text-gray-700 text-center text-base">
              <Link to="" className="px-4 hover:text-blue-600 transition-all">
                Features
              </Link>
              <Link to="" className="px-4 hover:text-blue-600 transition-all">
                Pricing
              </Link>
              <Link to="" className="px-4 hover:text-blue-600 transition-all">
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-2 tracking-wider">
            <Link
              to="/login"
              className="bg-inherit text-gray-600 text-base py-2 px-5 rounded-full hover:opacity-80 transition-all flex justify-center items-center"
            >
              Sign in
            </Link>
            <Link
              to=""
              className="bg-blue-600 text-white text-base py-2 pt-3 px-6 rounded-full hover:opacity-80 transition-all flex justify-center items-center"
            >
              Get started today
            </Link>
          </div>
        </div>
      </header>{" "}
      <main className="p-20 w-full">
        <h1 className="text-[4rem] text-center font-medium leading-[4.25rem] text-gray-800">
          Managing <span className="text-blue-600">your students</span>
          <br /> made simple
        </h1>
        <h2 className="mt-6 text-center text-gray-600 text-lg">
          Tracking tuition fee payments, debts, printing statements and
          managing students performance can be tedious. <br /> With Work-Smart there's
          always a room for easy, your all in one tool.
        </h2>
        <div className="w-full flex justify-center items-center space-x-4 mt-4">
          <Link
            to=""
            className="bg-gray-700 text-white text-sm h-9 px-4 pt-1 rounded-full hover:opacity-80 transition-all flex justify-center items-center"
          >
            Get 1 month free
          </Link>
          <Link
            to=""
            className="bg-inherit border bordr-gray-700 text-gray-600 text-base h-9 px-4 pt-1 rounded-full hover:opacity-80 transition-all flex justify-center items-center"
          >
            Contact Support
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Landing;
