import { FaGithub } from "react-icons/fa";

export default function Legal() {
    return (
        <footer className="legal">
            <ul className="legal-links">
                <li>
                    <a href="https://github.com/fatiharapoglu/twitter" target="_blank">
                        Terms of Service
                    </a>
                </li>
                <li>
                    <a href="https://github.com/fatiharapoglu/twitter" target="_blank">
                        Privacy Policy
                    </a>
                </li>
                <li>
                    <a href="https://github.com/fatiharapoglu/twitter" target="_blank">
                        Cookie Policy
                    </a>
                </li>
                <li>
                    <a href="https://github.com/fatiharapoglu/twitter" target="_blank">
                        Imprint
                    </a>
                </li>
                <li>
                    <a href="https://github.com/fatiharapoglu/twitter" target="_blank">
                        Accessibility
                    </a>
                </li>
            </ul>
            <div className="copy">
                <a href="https://fatiharapoglu.dev" target="_blank">
                    &copy; 2023 | Fatih Arapoğlu
                </a>
                <a href="https://github.com/fatiharapoglu" target="_blank">
                    <FaGithub className="github" />
                </a>
            </div>
        </footer>
    );
}
