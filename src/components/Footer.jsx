function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="w-full mx-auto px-4 flex justify-center items-center text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} DressUp. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
