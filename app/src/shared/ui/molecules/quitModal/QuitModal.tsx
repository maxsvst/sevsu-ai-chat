// "use client";

// import React from "react";
// // import styles from "./Modal.module.scss";
// import { WithUserModal } from "@/entities/user/ui";
// import { Input } from "../input";
// import { CloseIcon } from "../../atoms/closeIcon";

// const SettingsModal = ({
//   settingsVisbilityHandler,
// }: {
//   settingsVisbilityHandler: any;
// }) => {
//   return (
//     <div className={styles.settingsModalWrapper}>
//       <CloseIcon clickHandler={() => settingsVisbilityHandler(false)} />
//       <div className={styles.settingsModalTitle}>Настройки</div>
//       <form className={styles.settingsModalForm}>
//         <Input type="text" placeholder="Имя" />
//         <Input type="text" placeholder="Имя" />
//         <hr className={styles.settingsModalDivider} />
//         <Input type="text" placeholder="Имя" />
//         <Input type="text" placeholder="Имя" />
//         <hr className={styles.settingsModalDivider} />
//         <Input type="password" placeholder="Имя" />
//       </form>
//       <button className={styles.settingsModalSaveBtn}>Сохранить</button>
//     </div>
//   );
// };

// export default WithUserModal(SettingsModal);
