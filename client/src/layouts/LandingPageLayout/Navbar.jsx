import {Link} from "react-router-dom";
import Logo from "../../components/icons/Logo";
import { IconBrandYoutube, IconLogin } from "@tabler/icons";

const Navbar = () => {
  return (
    <nav className="wrapper mt-5 h-16 bg-transparent p-8 px-10">
      <div className="flex h-full items-center justify-between">
        <div className="flex gap-6">
          <div className="flex flex-shrink-0 items-center">
            <Link to="/">
              <a>
                <Logo className="h-8 w-auto md:h-12" />
              </a>
            </Link>
          </div>
        </div>
        <div>
            <div className="flex items-center gap-8">
              <Link to="/signin">
                <a className="mr-4 inline-flex items-center text-xs text-primary md:text-sm">
                  <IconBrandYoutube
                    className="mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  <span>Watch Demo</span>
                </a>
              </Link>
              <Link to="/auth?action=sign_in">
                <a className="relative inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-xs font-medium text-white shadow-sm focus:outline-none  focus:ring-2 focus:ring-offset-2 md:text-sm ">
                  <span>Sign In</span>
                  <IconLogin className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </Link>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
