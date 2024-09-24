interface ISelectProps {
  items: {
    text: string;
    value: string;
  }[];
}

export function Select({ items }: ISelectProps) {
  return <select name="city" id="city-select">
    {
      items.map((item) => (
        <option key={item.value} value={item.value}>{item.text}</option>
      ))
    }
  </select>
}
