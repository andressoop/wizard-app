<template>
  <div>
    <!-- Full Page Image Header with Vertically Centered Content -->
    <header class="masthead bg-primary">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-8 text-left">
            <h1 class="text-light">
              <strong>Wizard App</strong>
            </h1>
            <h1 class="text-light">Unleash your potential</h1>
            <br>
            <p class="text-light lead">
              Project management Software for freelancers
              <br>& small teams.
            </p>
            <br>
            <div class="d-flex flex-row">
              <button
                class="btn btn-lg btn-light btn-login text-uppercase font-weight-bold mb-2 mr-2"
                type="button"
              >
                <i class="fa fa-magic text-primary"></i> <router-link to="/login"> Login</router-link>
              </button>
              <button
                class="btn btn-lg btn-light btn-login text-uppercase font-weight-bold mb-2"
                type="button"
                disabled
              >
                <i class="fa fa-download"></i> Download
              </button>
            </div>
          </div>
          <div class="col-4 mt-1">
              <img src="../assets/icon.png" alt="Wizard Logo" class="landing-logo">
          </div>
        </div>
      </div>
    </header>

    <!-- Features Content -->
    <section class="py-5 mt--200 bg-transparent mb-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <div class="icon mb-4">
                      <i class="fas fa-check text-primary rounded-circle-icon"></i>
                    </div>
                    <h5 class="card-title text-primary">KANBAN BOARD</h5>
                    <p
                      class="card-text"
                    >Visualize your tasks and enhance your workflow with proven Kanban methodology. Be ahead of your schedules!</p>
                    <span class="badge badge-primary">AGILE DEVELOPMENT</span>
                    <span class="badge badge-primary">ENHANCED FLOW</span>
                    <span class="badge badge-primary">CONTINUOUS DELIVERY</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <div class="icon mb-4">
                      <i class="fas fa-sticky-note text-success rounded-circle-icon"></i>
                    </div>
                    <h5 class="card-title text-success">NOTEPAD</h5>
                    <p
                      class="card-text"
                    >Store your notes, draft action plans and write down client meetings. Everything in one place for a quick access.</p>
                    <span class="badge badge-success">FAST DRAFTING</span>
                    <span class="badge badge-success">CODE HIGHLIGHTING</span>
                    <span class="badge badge-success">TODO LIST</span>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="card">
                  <div class="card-body">
                    <div class="icon mb-4">
                      <i class="fas fa-users text-danger rounded-circle-icon"></i>
                    </div>
                    <h5 class="card-title text-danger">CLIENT LIST</h5>
                    <p
                      class="card-text"
                    >Your contacts, details and related projects of your clients for a complete overview of your freelance business.</p>
                    <span class="badge badge-danger">CONTACT DETAILS</span>
                    <span class="badge badge-danger">RELATED PROJECTS</span>
                    <span class="badge badge-danger">TABLE VIEW</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How-to Content -->
    <section class="section mb-5" style="margin-top: 100px;">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-5 mr-auto d-flex align-items-center mt-4 mt-md-0">
            <div>
              <div class="icon mb-4">
                <i class="fas fa-unlock-alt text-light bg-primary rounded-circle-icon"></i>
              </div>
              <h3>Make An Account</h3>
              <p
                class="margin-top-s"
              >Download the app or go to the login page to sign-up the service</p>
              <div class="d-flex flex-column">
                <div>
                  <i
                    class="fab fa-google fa-sm text-light bg-primary rounded-circle-icon-sm mr-3 mb-3"
                  ></i> Google Authentication
                </div>
                <div>
                  <i
                    class="fas fa-gavel fa-sm text-light bg-primary rounded-circle-icon-sm mr-3 mb-3"
                  ></i> GDPR Compliant
                </div>
                <div>
                  <i
                    class="fas fa-user-slash fa-sm text-light bg-primary rounded-circle-icon-sm mr-3 mb-3"
                  ></i> Delete your data anytime
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div>
              <img alt="Sign-up" class="img-fluid" src="../assets/images/signup.gif">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section mb-5" style="margin-top: 200px;">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div>
              <img alt="Web Studio" class="img-fluid" src="../assets/images/kanban.gif">
            </div>
          </div>
          <div class="col-md-6 col-lg-5 ml-auto d-flex align-items-center mt-4 mt-md-0">
            <div>
              <div class="icon mb-4">
                <i class="fas fa-stream text-light bg-primary rounded-circle-icon"></i>
              </div>
              <h3>Create your Kanban board</h3>
              <p class="margin-top-s">Organise your tasks with a proven method to succeed</p>
              <div class="d-flex flex-column">
                <div>
                  <i
                    class="fas fa-hand-pointer fa-sm text-light bg-primary rounded-circle-icon-sm mr-3 mb-3"
                  ></i> Drag and Drop
                </div>
                <div>
                  <i
                    class="fas fa-eye fa-sm text-light bg-primary rounded-circle-icon-sm mr-3 mb-3"
                  ></i> Visualise your tasks
                </div>
                <div>
                  <i
                    class="fas fa-infinity fa-sm text-light bg-primary rounded-circle-icon-sm mr-3 mb-3"
                  ></i> Unlimited lists and tasks
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section mb-5" style="margin-top: 100px;">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-5 mr-auto d-flex align-items-center mt-4 mt-md-0">
            <div>
              <div class="icon mb-4">
                <i class="fas fa-clipboard-check text-light bg-primary rounded-circle-icon"></i>
              </div>
              <h3>Add Details to Tasks</h3>
              <p
                class="margin-top-s"
              >Information is the key for success. Fill up your tasks with all the information you need to get them done fast and efficiently.</p>
              <div class="d-flex flex-column">
                <div>
                  <i
                    class="fas fa-clipboard fa-sm text-light bg-primary rounded-circle-icon-sm mr-3 mb-3"
                  ></i> Write detailed descriptions
                </div>
                <div>
                  <i
                    class="fas fa-clock fa-sm text-light bg-primary rounded-circle-icon-sm mr-3 mb-3"
                  ></i> Set deadlines
                </div>
                <div>
                  <i
                    class="fas fa-hammer fa-sm text-light bg-primary rounded-circle-icon-sm mr-3 mb-3"
                  ></i> Plan your tasks by time and difficulty
                </div>
                <div>
                  <i
                    class="fas fa-tag fa-sm text-light bg-primary rounded-circle-icon-sm mr-3 mb-3"
                  ></i> Add labels
                </div>
                <div>
                  <i
                    class="fas fa-list-ul fa-sm text-light bg-primary rounded-circle-icon-sm mr-3 mb-3"
                  ></i> Split down huge tasks with a todo list
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div>
              <img alt="Sign-up" class="img-fluid mt-5" src="../assets/images/task.gif">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Content -->
    <footer class="footer mt-5 bg-primary">
      <div class="container">
        <div class="d-flex justify-content-around">
          <div class="align-items-center mt-5">
            <h3 class="text-light">Stop starting, start making!</h3>
            <p class="text-light lead">Download now and get started!</p>
          </div>
          <div class="align-items-center mt-5">
            <button
              class="btn btn-lg btn-light btn-login text-uppercase font-weight-bold mb-2"
              type="button"
            >
              <i class="fa fa-magic text-primary"></i> <router-link to="/login"> Login</router-link>
            </button>
            <span class="h4 text-light mx-3">or</span>
            <button
              class="btn btn-lg btn-light btn-login text-uppercase font-weight-bold mb-2"
              type="button"
              disabled
            >
              <i class="fa fa-download"></i> Download
            </button>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import firebase from '../helpers/firebaseConfig'

export default {
  name: 'Landing',
  beforeCreate() {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {

        if (user.providerData[0].providerId == 'google.com'){
          this.updateGmailData();
          this.$router.push('/dashboard');
        } else {
          this.$store.commit('setCurrentUser', user);
          this.$store.dispatch('fetchUserProfile', user)
          this.$router.push('/dashboard');
        }
        
      } else {
        this.$router.push('/landing');
      }
    });
  },
}
</script>

<style scoped>
.landing-logo {
    border: 4px solid white;
    border-radius: 50%;
}

.masthead {
  background-image: radial-gradient(
    circle farthest-corner at 29.1% 51.5%,
    rgba(108, 99, 255, 1) 2.1%,
    rgba(108, 99, 255, 0.85) 100.2%
  );
  height: 100vh;
  min-height: 500px;
  clip-path: polygon(
    0 0,
    /* left top */ 100% 0,
    /* right top */ 100% 100%,
    /* right bottom */ 0 95% /* left bottom */
  );
}

.card {
  margin-right: 30px;
}

.badge {
  margin-right: 5px;
}

.footer {
  bottom: 0;
  width: 100%;
  padding: 100px 50px;
  clip-path: polygon(
    0 0,
    /* left top */ 100% 7%,
    /* right top */ 100% 100%,
    /* right bottom */ 0% 100% /* left bottom */
  );
}

/* Icons */

.circle {
  display: inline-block;
  background: red;
  border-radius: 60px;
  box-shadow: 0px 0px 2px #888;
  padding: 0.6em 0.6em;
}

.rounded-circle-icon {
  background: #f1f2f6;
  padding: 20px;
  border-radius: 50% !important;
}

.rounded-circle-icon-sm {
  background: #f1f2f6;
  padding: 10px;
  border-radius: 50% !important;
}

/* Media Queries */
@media only screen and (max-width: 1000px) {
  .card {
    margin-bottom: 30px;
  }
}
</style>
