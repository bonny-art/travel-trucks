import Swal from "sweetalert2";

export const showSuccessToast = (title, message) => {
  Swal.fire({
    position: "center",
    width: 600,

    icon: "success",
    iconColor: "#E44848",

    title: title,
    text: message,
    color: "#101828",

    showConfirmButton: true,
    confirmButtonColor: "#E44848",
    confirmButtonText: "Great!",

    backdrop: `
    rgba(0,0,0,0.5)
      `,
  });
};
