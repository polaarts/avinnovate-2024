import { Card, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function CardComponent(props) {
  return (
    <Flex direction="column" ga="3">
      <Card variant="surface" className="">
        <Image src={props.image} width={500} height={500} alt={props.header} />
        <Text as="div" size="2" weight="bold">
          {props.header}
        </Text>
        <Text as="div" color="gray" size="2">
          {props.details}
        </Text>
      </Card>
    </Flex>
  );
}
