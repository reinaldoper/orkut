import NavLink from "../components/NavLink";

const NotFoundPage = () => {

  return (
    <>
      <NavLink />
      <div className="bg-yellow-300 h-screen flex items-center justify-center">
        <h1 className="text-5xl text-red-900">404 - Página não encontrada</h1>
      </div>
    </>
  );
};

export default NotFoundPage;