import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.UCookHomePage}>
              <div className={styles.WelcomePopUp}>
                <p>Welcome to the U-Cook Virtual Cooking Assistant! <br/><br/>
                  This application strives to help you learn to cook with friends and family while using voice recognition to <br/>
                  effortlessly browse through different recipes and cookbooks! <br/><br/>
                  To start cooking please press continue!
                </p>

                <button type="submit"><strong>Continue</strong></button>
              </div>
             
            </div>
        </main>

  
    );
}
