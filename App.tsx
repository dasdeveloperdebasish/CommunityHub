import { RootNavigator } from "@/core/navigation/RootNavigator";
import { AppProviders } from "@/core/providers/AppProviders";

export default function App(): React.JSX.Element {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
