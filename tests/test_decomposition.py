import numpy as np
import statsmodels.api as sm
import torch

from DoTLMViz import utils
from DoTLMViz.decomposition import PCA


class TestPCA:
    stackloss_dataset = sm.datasets.stackloss.load_pandas()

    def custom_pca(self, data):
        data_pt = torch.tensor(np.array(data))

        data_pt_scaled = utils.standardize(data_pt)

        custom_pca = PCA()
        custom_pca.fit(data_pt_scaled)

        return custom_pca

    def test_pca(self):
        stackloss = self.stackloss_dataset.data

        custom_pca = self.custom_pca(stackloss)

        assert (custom_pca.components_**2).sum() == len(custom_pca.components_)
