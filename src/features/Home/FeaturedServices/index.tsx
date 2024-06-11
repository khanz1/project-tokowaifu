import { Text, SimpleGrid, Container, rem, Group, Badge, Title, Box } from "@mantine/core";
import { IconTruck, IconCertificate, IconCoin } from "@tabler/icons-react";
import classes from "./product-feature.module.css";

interface FeatureProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: React.FC<any>;
  title: string;
  description: string;
}

function Feature({
  icon: Icon,
  title,
  description,
  className,
  ...others
}: FeatureProps) {
  return (
    <div className={classes.feature} {...others}>
      <div className={classes.overlay} />

      <div className={classes.content}>
        <Icon
          style={{ width: rem(38), height: rem(38) }}
          className={classes.icon}
          stroke={1.5}
        />
        <Text fw={700} fz="lg" mb="xs" mt={5} className={classes.title}>
          {title}
        </Text>
        <Text c="dimmed" fz="sm">
          {description}
        </Text>
      </div>
    </div>
  );
}

const mockdata = [
  {
    icon: IconTruck,
    title: "Free Worldwide shipping",
    description:
      "From the land of Teyvat to every corner of the world, your favorite figures can now embark on their journey straight to your doorstep.",
  },
  {
    icon: IconCertificate,
    title: "Best Quality Product",
    description:
      "Crafted with the precision of an adeptus and the care of an alchemist, our figures capture every intricate detail.",
  },
  {
    icon: IconCoin,
    title: "Very Affordable Pricing",
    description:
      "Priced to ensure every Traveler can bring home a piece of their journey, making these treasures accessible to all.",
  },
];

export function FeaturedServices() {
  return (
    <Container mt={30} mb={30} size="lg">
      <Box className={classes.titleWrapper}>
        <Group justify="center">
          <Badge variant="filled" size="lg">
            Best Genshin Impact Figure ever
          </Badge>
        </Group>

        <Title order={2} className={classes.title} ta="center" mt="sm">
          Crafted with precision, inspired by adventure.
        </Title>

        <Text c="dimmed" className={classes.description} ta="center" mt="md">
          Every so often, you might spot a Hilichurl missing a club. This
          happens when they clash with a Geo Shieldwall Mitachurl, resulting in
          a shattered weapon.
        </Text>
      </Box>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={50}>
        {mockdata.map((item) => (
          <Feature {...item} key={item.title} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
