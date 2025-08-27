const NavBar = () => {

    return(
        <nav className="w-full flex flex-row justify-start shadow-md border border-gray-200 backdrop-blur-sm sticky top-0">
            <div className="p-5 text-2xl font-bold ml-6">CricScore</div>
            <div className="hidden lg:flex flex-row flex-1 justify-end p-5 space-x-35 mr-6 ">
                <span>Home</span>
                <span>Matches</span>
                <span>Series</span>
                <span>About</span>
                <span>Scorer Login</span>
            </div>
        </nav>
    );

}
export default NavBar;