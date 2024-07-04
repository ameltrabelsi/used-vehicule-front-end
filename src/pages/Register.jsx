const Register = () => {
  return (
    <div className="container my-5">
      <form className="row g-3 ">
        <div className="col-md-3  ">
          <label for="validationDefault01" className="form-label ">
            First name
          </label>
          <input type="text" className="form-control" required />
        </div>
        <div className="col-md-4">
          <label for="validationDefault02" className="form-label">
            Last name
          </label>
          <input type="text" className="form-control" required />
        </div>
        <div className="col-md-4">
          <label for="validationDefaultUsername" className="form-label">
            Username
          </label>
          <div className="input-group">
            <span className="input-group-text"></span>
            <input
              type="text"
              className="form-control"
              id="validationDefaultUsername"
              aria-describedby="inputGroupPrepend2"
              required
            />
          </div>
        </div>
        <div className="col-md-6 ">
          <label for="validationDefault03" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault03"
            required
          />
        </div>

        <div className="col-md-3 ">
          <label for="validationDefault05" className="form-label">
            Zip
          </label>
          <input
            type="text"
            className="form-control"
            id="validationDefault05"
            required
          />
        </div>
        <div className="col-12 ms-5">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="invalidCheck2"
              required
            />
            <label className="form-check-label" for="invalidCheck2">
              Agree to terms and conditions
            </label>
          </div>
        </div>
        <div className="col-12">
          <button className="btn btn-primary ms-5" type="submit">
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
