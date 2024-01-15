import { Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import ScrollLayout from '../../components/layouts/ScrollLayout';
import { gstyles, themeConfig } from '../../globalStyles';
import { UserCtx } from '../../state/contexts/User';
import BarPlot from '../../components/molecules/BarPlot';
import moment from 'moment';
import { SummaryCtx } from '../../state/contexts/Summary';
import { compactNumber } from '../../utils/utils';
import TopDevices from '../../components/organisms/TopDevices';
import DevicesMap from '../../components/organisms/DevicesMap';
import { RefreshControl } from 'react-native-gesture-handler';

const Dashboard = () => {
  const [user] = useContext(UserCtx);
  const [summary, , isReloading, reloadSummary] = useContext(SummaryCtx);

  return (
    <ScrollLayout isSafeArea styles={[styles.container, gstyles.pad1]}>
      <RefreshControl
        refreshing={isReloading}
        onRefresh={reloadSummary ? reloadSummary : () => {}}
      />
      <Text style={styles.title}>Hi {user.firstname}</Text>
      <Text style={styles.loginActivity}>
        Last Login at {moment(user.lastLogin).format('ddd, Do MMM HH:mm')}
      </Text>
      <Text style={styles.credits}>{compactNumber(summary?.totalCredits)}</Text>
      <Text style={styles.sub}>Carbon Credits</Text>
      {summary?.creditsLastWeek && summary?.creditsLastWeek.length !== 0 && (
        <BarPlot
          highestEverForUser={summary?.highestCredits}
          numbers={summary?.creditsLastWeek?.map(
            (credits) => credits?._sum?.amount ?? 0
          )}
        />
      )}
      <TopDevices devices={summary?.devices} />
      <DevicesMap devices={summary?.devices} />
    </ScrollLayout>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: { color: 'gray', fontWeight: '700', fontSize: 25 },
  credits: {
    color: themeConfig.colors.primary,
    fontWeight: '700',
    fontSize: 55,
  },
  sub: {
    fontWeight: '600',
    opacity: 0.5,
    fontSize: 15,
  },
  loginActivity: {
    fontSize: 13,
    color: 'gray',
  },
});
