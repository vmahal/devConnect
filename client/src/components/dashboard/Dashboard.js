import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';
import DashboardActions from './DashboardActions';

const Dashboard = ({
  auth: { user },
  getCurrentProfile,
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
      <Fragment>
        <div class='profile-top bg-primary p-2'>

          <div>
            {' '}
            <p className='lead' style={{ color: 'white' }}>
              <i className="fa fa-user" />  <b> Welcome, {user && user.name}</b>
            </p>
          </div>
        </div>

        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Experience experience={profile.experience}></Experience>
            <Education education={profile.education}></Education>

            <div className='my-2'>
              <button className='btn btn-danger' onClick={() => deleteAccount()}>
                <i className='fas fa-user-minus'></i>
                Delete My Account
            </button>
            </div>
          </Fragment>
        ) : (
            <Fragment>
              <p>You have not yet setup a profile , Please add some info</p>
              <Link to='/create-profile' className='btn btn-primary my-1'>
                Create profile
          </Link>
            </Fragment>
          )}
      </Fragment>
    );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
