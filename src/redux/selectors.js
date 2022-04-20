import {useSelector} from 'react-redux';

export function useProjectLoading() {
  const {
    loadingProject,
    loadingProjects,
    loadingPermissions,
    loadingDashboardData,
    loadingPurchaseData,
    loadingPurchaseDetails,
  } = useSelector(s => s.project);

  return (
    loadingProject ||
    loadingProjects ||
    loadingPermissions ||
    loadingDashboardData ||
    loadingPurchaseData ||
    loadingPurchaseDetails
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
export function useCustomerLoading() {
  const {
    loading,
    loadingSelectedProject,
    loadingCustomerData,
    loadingBankDetails,
    loadingBookingData,
    loadingModifyRequests,
    loadingModifyRequest,
    LoadingAccountDetails,
  } = useSelector(s => s.customer);
  const {loading: filesLoading} = useSelector(s => s.files);

  return (
    loading ||
    loadingSelectedProject ||
    loadingCustomerData ||
    loadingBankDetails ||
    loadingBookingData ||
    loadingModifyRequests ||
    loadingModifyRequest ||
    LoadingAccountDetails ||
    filesLoading
  );
}
