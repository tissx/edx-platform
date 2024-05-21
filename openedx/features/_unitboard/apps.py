import logging

from django.apps import AppConfig

from openedx.core.djangoapps.plugins.constants import ProjectType, SettingsType, PluginURLs, PluginSettings

log = logging.getLogger('_unitboard')


class UnitboardConfig(AppConfig):
    name = 'openedx.features._unitboard'
    verbose_name = '.Unitboard'

    plugin_app = {
        PluginURLs.CONFIG: {
            ProjectType.LMS: {
                PluginURLs.NAMESPACE: u'unitboard',
                PluginURLs.REGEX: u'^unitboard/',
                PluginURLs.RELATIVE_PATH: u'urls',
            }
        },
        PluginSettings.CONFIG: {
            ProjectType.LMS: {
                SettingsType.COMMON: {PluginSettings.RELATIVE_PATH: u'settings.common'},
                SettingsType.TEST: {PluginSettings.RELATIVE_PATH: u'settings.test'},
                SettingsType.DEVSTACK: {PluginSettings.RELATIVE_PATH: u'settings.devstack'},
            }
        }
    }

    def ready(self):
        """
        Procedures run once on Django start.
        """
        log.warning(
            """
            MX: custom feature initialised - UNITBOARD.
            """
        )
