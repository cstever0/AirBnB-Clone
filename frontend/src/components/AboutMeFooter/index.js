import "./AboutMeFooter.css";

function AboutMeFooter() {

    return (
        <div className="about-me-footer-container">
            <div className="about-me-link">
                <a href="https://www.linkedin.com/in/cory-stever-aa2730126/" target="_blank" rel="noreferrer" class="fab fa-linkedin"><span class="label">LinkedIn</span></a>
            </div>
            <div className="about-me-link">
                <a href="https://wellfound.com/u/cory-stever" target="_blank" rel="noreferrer" class="fab fa-angellist"><span class="label">WellFound</span></a>
            </div>
            <div className="about-me-link">
                <a href="https://github.com/cstever0" target="_blank" rel="noreferrer" class="fab fa-github"><span class="label">Github Profile</span></a>
            </div>
            <div className="about-me-link">
                <a href="https://github.com/cstever0/AirBnB-Clone" target="_blank" rel="noreferrer" class="fab fa-github"><span class="label">Project Repo</span></a>
            </div>
            <div className="about-me-link">
                <a href="https://cstever0.github.io/" target="_blank" rel="noreferrer" class="fab fa-github"><span class="label">Portfolio</span></a>
            </div>
        </div>

    );
};

export default AboutMeFooter;
