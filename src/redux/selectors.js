const {useSelector} = require('react-redux');

export function useProjectLoading() {
  const {
    loadingProject,
    loadingProjects,
    loadingPermissions,
    loadingDashboardData,
    loadingPurchaseData,
    loadingPurchaseDetails,
    loadingProjectCommonData,
  } = useSelector(s => s.project);

  return (
    loadingProject ||
    loadingProjects ||
    loadingPermissions ||
    loadingDashboardData ||
    loadingPurchaseData ||
    loadingPurchaseDetails ||
    loadingProjectCommonData
  );
}

export function useSalesLoading() {
  const {
    loading,
    loadingCommonData,
    loadingSalesData,
    loadingUnitStatus,
    loadingVisitors,
    loadingVisitor,
    loadingFollowups,
    loadingPipeline,
    loadingBankList,
    loadingBrokers,
    loadingVisitorActivities,
    loadingPipelineOrderList,
    loadingBrokerDetails,
    deletingPipeline,
    loadingHoldBookingDetails,
  } = useSelector(s => s.sales);

  return (
    loading ||
    loadingCommonData ||
    loadingSalesData ||
    loadingUnitStatus ||
    loadingVisitors ||
    loadingVisitor ||
    loadingFollowups ||
    loadingPipeline ||
    loadingBankList ||
    loadingBrokers ||
    loadingVisitorActivities ||
    loadingPipelineOrderList ||
    loadingBrokerDetails ||
    deletingPipeline ||
    loadingHoldBookingDetails
  );
}
