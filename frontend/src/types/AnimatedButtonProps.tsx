
interface AnimatedButtonProps {
  id: number;
  isClickedMap: Record<number, boolean>;
  handleClick: (id: number) => void;
}


export default AnimatedButtonProps;