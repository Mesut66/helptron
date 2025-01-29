function Header({title}){
    return(
        <>
        <div className="row mb-3">
            <div className="col">
                <h1 className="display-5">{title}</h1>
                <hr />
            </div>
        </div>
        </>

    );
}
export default Header;