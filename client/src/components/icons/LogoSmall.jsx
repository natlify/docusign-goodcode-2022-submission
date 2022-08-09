import { createStyles } from "@mantine/core";

const useLogoStyles = createStyles((theme) => ({
  h1: {
    color: theme.colors.primary[6],
    letterSpacing: "0.2em",
    textShadow: theme.other.mainShadow,
    marginRight: "-0.2em",

    [theme.fn.smallerThan("xs")]: {
      fontSize: 36,
    },
  },
}));

function LogoSmall(props) {
  const { classes } = useLogoStyles();
  return (
    <div className={classes}>
      <svg
        width="240"
        height="240"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <circle cx="120" cy="120" r="120" fill="#108049" />
        <path
          d="M148.162 134.227C126.155 155.986 104.899 176.993 83.6434 198C82.4467 197.412 81.25 196.825 80.0533 196.237C88.0362 178.342 96.0191 160.448 104.824 140.71C92.4007 140.71 82.1347 140.71 68 140.71C97.9542 106.35 125.567 74.675 153.18 43C154.152 43.5219 155.123 44.0438 156.095 44.5657C149.809 64.2399 143.523 83.9142 136.541 105.77C148.091 106.959 158.691 108.049 172 109.419C163.603 118.169 156.258 125.822 148.162 134.227Z"
          fill="#F2C619"
        />
      </svg>
    </div>
  );
}

export default LogoSmall;
